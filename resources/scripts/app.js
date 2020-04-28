import { Note }                     from '@tonaljs/tonal'
import fs                           from 'fs'
import { NoteEvent, Track, Writer } from 'midi-writer-js'
import path                         from 'path'

import configuration from './configuration'

class App {
	constructor(configuration = {}) {
		console.info('🔭  Phobos\n')

		this.configuration = configuration

		this.configuration.scales.forEach(scale => {
			this.configuration.notes.forEach(note => {
				const
					{ duration, velocity } = this.configuration.midi,
					{ octaves } = this.configuration,
					directory = path.resolve('../scales', scale.name),
					name = `${ note } ${ scale.name }`,
					intervals = [ 0, ... scale.intervals ]

				let notes = this.shift(note, [ ... this.configuration.notes ])

				intervals.forEach(interval => {
					for (let i = 0; i < interval; i ++) {
						notes.shift()
					}

					notes.push(notes.shift())
				})

				notes = this.shift(
					this.configuration.notes.filter(note => notes.includes(note))[0],
					notes
				)

				let midi = []

				for (let i = Math.min(... octaves); i < Math.max(... octaves); i ++) {
					notes.forEach(note => {
						midi.push(note + i)
					})
				}

				midi = midi.filter(note => Note.midi(note) !== null)

				const
					track = new Track(),
					event = new NoteEvent({ duration, pitch: midi, velocity })

				track.addEvent(event)

				const writer = new Writer(track)

				try {
					if (! fs.existsSync(directory)) {
						fs.mkdirSync(directory, { recursive: true })
					}

					fs.writeFileSync(
						path.resolve(directory, `${ name }.mid`),
						writer.dataUri().replace(/^data:audio\/midi;base64,/, ''),
						{ encoding: 'base64' }
					)

					console.log('💾  Scale saved: %s', name)
				} catch {
					console.warn('❗️  Warning: Scale can\'t be saved (%s)', name)
				}
			})
		})
	}

	shift(note, notes) {
		while (notes[0] !== note) {
			notes.push(notes.shift())
		}

		return notes
	}
}

export default new App(configuration)

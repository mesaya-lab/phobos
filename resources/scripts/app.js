import { Note }                     from '@tonaljs/tonal'
import fs                           from 'fs'
import { NoteEvent, Track, Writer } from 'midi-writer-js'
import path                         from 'path'

import configuration from './configuration'

class App {
	constructor(configuration = {}) {
		console.info('🔭  Phobos\n')

		this.configuration = configuration
		this.counter = 0

		this.configuration.scales.forEach(scale => {
			this.configuration.notes.some(note => {
				const
					{ duration, velocity } = this.configuration.midi,
					{ octaves }            = this.configuration,
					directory              = path.resolve('../scales', scale.name),
					intervals              = [ 0, ... scale.intervals ]

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

				const
					chromatic = scale.name === 'Chromatic',
					writer  = new Writer(track),
					message = [
						this.counter % this.configuration.notes.length === 0 ? '\n' : '',
						chromatic ? scale.name : `${ note.padEnd(2) } ${ scale.name }`
					]

				try {
					if (! fs.existsSync(directory)) {
						fs.mkdirSync(directory, { recursive: true })
					}

					fs.writeFileSync(
						path.resolve(
							directory,
							chromatic ? `${ scale.name }.mid` : `${ note } ${ scale.name }.mid`
						),
						writer.dataUri().replace(/^data:audio\/midi;base64,/, ''),
						{ encoding: 'base64' }
					)

					console.log(... [ '%s💾  Scale saved: %s', ... message ])
				} catch {
					console.warn(... [ '%s❗️  Warning: Scale can\'t be saved (%s)', ... message ])
				}

				if(chromatic) {
					return true
				} else {
					this.counter ++
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

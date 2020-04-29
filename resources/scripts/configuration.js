export default {
	midi: {
		duration: 1,
		velocity: 100
	},
	notes:   [ 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B' ],
	octaves: [ -1, 10 ],
	scales:  [
		{
			intervals: [ 1, 0, 1, 1, 0, 2 ],
			name:      'Harmonic Minor'
		},
		{
			intervals: [ 1, 1, 0, 1, 1, 1 ],
			name:      'Major'
		},
		{
			intervals: [ 1, 0, 1, 1, 1, 1 ],
			name:      'Melodic Minor'
		},
		{
			intervals: [ 1, 0, 1, 1, 0, 1, 1 ],
			name:      'Natural Minor'
		},
	]
}

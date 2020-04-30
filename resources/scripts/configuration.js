export default {
	midi: {
		duration: 1,
		velocity: 100
	},
	notes:   [ 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B' ],
	octaves: [ -1, 10 ],
	scales:  [
		{
			intervals: [ 2, 1, 0, 0, 2, 1 ],
			name:      'Blues'
		},
		{
			intervals: [ 1, 0, 1, 1, 1, 0, 1 ],
			name:      'Dorian'
		},
		{
			intervals: [ 1, 0, 1, 1, 0, 2, 0 ],
			name:      'Harmonic Minor'
		},
		{
			intervals: [ 0, 1, 1, 0, 1, 1, 1 ],
			name:      'Locrian'
		},
		{
			intervals: [ 1, 1, 1, 0, 1, 1, 0 ],
			name:      'Lydian'
		},
		{
			intervals: [ 1, 1, 0, 1, 1, 1, 0 ],
			name:      'Major'
		},
		{
			intervals: [ 1, 1, 2, 1, 2 ],
			name:      'Major Pentatonic'
		},
		{
			intervals: [ 1, 0, 1, 1, 1, 1, 0 ],
			name:      'Melodic Minor'
		},
		{
			intervals: [ 2, 1, 1, 2, 1 ],
			name:      'Minor Pentatonic'
		},
		{
			intervals: [ 1, 1, 0, 1, 1, 0, 1 ],
			name:      'Mixolydian'
		},
		{
			intervals: [ 1, 0, 1, 1, 0, 1, 1 ],
			name:      'Natural Minor'
		},
		{
			intervals: [ 0, 1, 1, 1, 0, 1, 1 ],
			name:      'Phrygian'
		},
		{
			intervals: [ 1, 1, 1, 1, 1, 1 ],
			name:      'Whole Tone'
		},
	]
}

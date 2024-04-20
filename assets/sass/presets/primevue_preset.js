const pvPreset = {
	dialog: {
		root: {
			style: {
				padding: '0',
				minWidth: '10rem',
				'border-radius': '20px',
			},
		},
		header: {
			style: {
				'background-color': '#CCC',
			},
		},
		content: {
			style: {
				padding: '1rem',
				'background-color': '#EEE',
			},
		},
		footer: {
			style: {
				'background-color': '#CCC',
			},
		},
	},
	card: {
		root: {
			style: {
				minWidth: '10rem',
				'background-color': '#CCC',
			},
			class: 'shadow-4 m-1 p-1 border-1 border-round-lg',
		},
		header: {
			style: {
				'background-color': '#CCC',
			},
		},
		title: {
			style: {
				color: '#000',
			},
			class: 'text-black text-lg text-center',
		},
		subtitle: {
			style: {
				color: '#000',
				'background-color': '#DDD',
				padding: '1rem',
			},
		},
		content: {
			style: {
				padding: '1rem',
				'background-color': '#DDD',
				color: '#000',
			},
		},
		footer: {
			style: {
				'background-color': '#CCC',
			},
		},
	},

	menubar: {
		root: {
			style: {
				'background-color': '#transparent',
				'border-radius': '10px',
			},
		},
		menu: {
			style: {
				'background-color': '#transparent',
			},
		},
		submenu: {
			style: {
				'background-color': '#transparent',
			},
		},

		content: {
			style: {
				padding: '0.3rem',
				'background-color': '#transparent',
			},
		},
	},
}

export default pvPreset

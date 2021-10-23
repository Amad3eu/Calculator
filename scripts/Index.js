API('zmzwEJ')

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

new Vue({
	el: '#app',
	data: {
		// calculation:'15*98',
		// tempResult:'1470',
		calculation:'',
		tempResult:'',
	},
	mounted() {
		let btns = document.querySelectorAll('.btn')
		for (btn of btns) {
			btn.addEventListener('click',function() {
				this.classList.add('animate')
				this.classList.add('resetappearanim')
			})
			btn.addEventListener('animationend',function() {
				this.classList.remove('animate')
			})
		}
	},
	methods: {
		append(value) {
			this.calculation += value.toString()
		},
		clear() {
			this.calculation = ''
			this.tempResult = ''
		},
		getResult() {
			if(this.tempResult != ''){
				this.calculation = this.tempResult
				//this.tempResult = ''
			}
		},
		backspace() {
			this.calculation = this.calculation.slice(0,-1)
		}
	},
	watch: {
		calculation() {
			if(this.calculation !== '' && !isNaN(this.calculation.slice(-1)) && this.calculation != this.result ){
				this.tempResult = this.result.toString()
			}
		}
	},
	computed: {
		result() {
			if(!isNaN(this.calculation.slice(-1)))
				return eval(this.calculation)
			else
				return eval(this.calculation.slice(0, -1))
		},
		fontSize() {
			return this.fontSize = 50-(this.tempResult.length*1.25)
		}
	},
	filters: {
	  hugeNumber: (value) => {
		 let parts = value.toString().split(".");
		 parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
		 return parts.join(".");
	  },
		number: (value) => {
			return value.replaceAll('*','x')
		},
		calculation: (value) => {
			return value.replaceAll('x',' x ').replaceAll('/',' / ').replaceAll('+',' + ').replaceAll('-',' - ')
		}
	}
})
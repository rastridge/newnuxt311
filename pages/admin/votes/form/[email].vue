<template>
	<div class="my-simple-card-style">
		<div v-if="haveQuestions">
			<div v-for="(question, q_index) in questions" :key="q_index">
				<FormKit
					v-model="answers[q_index].vote_choice_id"
					type="radio"
					:label="question.vote_question"
					:options="options[q_index]"
				/>
			</div>
			<display-cancelform :destination="'/votes'" />
			<Button
				label="Submit"
				severity="info"
				class="m-2"
				@click="handleSubmit(account_email, answers)"
			/>
		</div>
		<div v-else>
			<h1
				class="text-xs sm:text-sm md:text-md lg:text-lg mx-auto border-round-md md:border-round-lg shadow-6 m-2 p-4 w-full md:w-6"
			>
				You have no remaining unanswered questions
			</h1>
		</div>
	</div>
</template>

<script setup>
	import '@formkit/themes/genesis'

	const route = useRoute()

	const account_email = ref(route.params.email)
	const questions = ref([])
	const choices = ref([])
	const usedChoices = ref([])
	const answers = ref([])
	const haveQuestions = ref(0)
	const options = ref([])

	// convert for formkit
	const convertChoicesToOptions = () => {
		options.value = []
		let temparray = []
		let prev = usedChoices.value[0].vote_question_id

		for (let i = 0; i < usedChoices.value.length; i++) {
			const element = usedChoices.value[i]

			// set FormKit radio input label, value pair
			let n = {}
			n.label = element.vote_choice
			n.value = element.vote_choice_id

			if (prev !== element.vote_question_id) {
				// new question - push to options - start new array
				prev = element.vote_question_id
				options.value.push(temparray)
				temparray = []
				temparray.push(n)
			} else {
				temparray.push(n)
			}
			// no more usedChoices - push to options
			if (i === usedChoices.value.length - 1) {
				options.value.push(temparray)
			}
		}
	}

	const initAnswers = () => {
		questions.value.forEach((question) => {
			answers.value.push({
				vote_question_id: question.vote_question_id,
				vote_choice_id: '0',
			})
		})
	}

	// get questions and choices. Convert choices to Formkit options. Init Answers
	const getQuestions = async (account_email) => {
		// get questions
		const account_email_lc = account_email.value.toLowerCase()
		const { data, error: error1 } = await useFetch(
			`/votes/questions/${account_email_lc}`,
			{
				method: 'GET',
			}
		)
		questions.value = data.value

		// get all choices for all questions
		const { data: ch, error: error2 } = await useFetch(
			`/votes/getusedchoices`,
			{
				method: 'GET',
			}
		)
		choices.value = ch.value

		// make choices array in each question
		questions.value.forEach((q) => {
			q.choices = []
		})
		// fill choices arrays for each question
		questions.value.forEach((question) => {
			choices.value.forEach((choice) => {
				if (choice.vote_question_id === question.vote_question_id) {
					question.choices.push(choice) // fill choices array
					usedChoices.value.push(choice) // fill used choices array
				}
			})
		})

		convertChoicesToOptions()
		haveQuestions.value = questions.value.length
		initAnswers()
	}

	getQuestions(account_email)

	const handleSubmit = async (account_email, answers) => {
		const { data, error: error1 } = await useFetch(`/votes/registerballot`, {
			method: 'POST',
			body: { account_email, answers },
		})
		navigateTo('/admin/votes/thanks')
	}
</script>

<template>
	<div>
		<Head>
			<Title>Other EGU Results and Standingst</Title>
		</Head>
		<div class="topsectioncenter">
			<div class="topsectionitem">
				<Common-header title="Empire Geographical Union" />
			</div>

			<div class="topsectionitem">
				<Card>
					<template #content>
						<nuxt-link
							to="https://xplorer.rugby/empire/fixtures-results?comp=F55b2bWvN7CKLA6cE&team=All&tab=Results"
							target="_blank"
							rel="noopener"
						>
							<Button label="League Results" class="m-1"></Button>
						</nuxt-link>

						<nuxt-link
							to="https://xplorer.rugby/empire/fixtures-results?comp=F55b2bWvN7CKLA6cE&team=All&tab=Ladder"
							target="_blank"
							rel="noopener"
						>
							<Button label="League Standings" class="m-1" />
						</nuxt-link>
					</template>
				</Card>
			</div>
		</div>
	</div>
</template>

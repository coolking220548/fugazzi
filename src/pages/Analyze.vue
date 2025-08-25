<template>
	<div class="dashboard-layout">
    <side-bar/>
		<div class="main-area">
			<top-bar/>
			<div class="dashboard-content">
				<div>
					<h2>Fake News Detection Options</h2>
					<p>Select your option based on what form your news is in.</p>
				</div>
				<div class="options-container">
					<div id="option-card" @click="selected = 'text'">
							<span class="fake-label">Text</span>
							<p>Analyze text-based news.</p>
					</div>
					<div id="option-card" @click="selected = 'image'">
							<span class="fake-label">Image</span>
							<p>Analyze images of news.</p>
					</div>
				</div>
				<div v-if="selected">
					<component :is="selectedComponent"/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import TextInputAnalysis from '../components/TextInputAnalysis.vue';
import ImageInputAnalysis from '../components/ImageInputAnalysis.vue';

export default {
	data() {
		return {
			selected: null // Start with nothing selected
		};
	},
	computed: {
		selectedComponent() {
			return this.selected === 'text' ? TextInputAnalysis
				: this.selected === 'image' ? ImageInputAnalysis
				: null;
		}
	}
};
</script>

<style scoped>
h2 {
  color: #e0e6f6;
  margin-bottom: 24px;
}
p {
  color: #b6c8f6;
  margin-bottom: 32px;
}
.dashboard-layout {
  display: flex;
  min-height: 100vh;
  background: transparent;
}

.main-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.dashboard-content {
  padding: 32px 40px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.options-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
}
#option-card {
  background: rgba(30, 34, 54, 0.92);
  border-radius: 14px;
  box-shadow: 0 2px 12px 0 rgba(44,120,255,0.08);
  padding: 24px 8px;
  margin-bottom: 16px;
  color: #e0e6f6;
  text-align: center;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
}

#option-card:hover {
  background: rgba(44, 120, 255, 0.10);
}

.fake-label {
  color: #ff6b6b;
  font-weight: bold;
}
.real-label {
  color: #00e6a8;
  font-weight: bold;
}
</style>
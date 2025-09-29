<template>
  <div v-if="explanation" 
       class="analyze-result"
       :class="{
         'result-true': explanation.includes('True'),
         'result-false': explanation.includes('False'),
         'result-unsure': explanation.includes('Not sure')
       }">
       
    <span v-if="explanation.includes('True')" class="icon">
      <FontAwesomeIcon :icon="byPrefixAndName.fas['check']" /> Verified
    </span>
    <span v-else-if="explanation.includes('False')" class="icon">
      <FontAwesomeIcon :icon="byPrefixAndName.fas['triangle-exclamation']" /> Fake
    </span>
    <span v-else-if="explanation.includes('Not sure')" class="icon">
      <FontAwesomeIcon :icon="byPrefixAndName.fas['circle-question']" /> Not Sure
    </span>

    <p>{{ explanation }}</p>
  </div>

  <a v-if="source && explanation.includes('True')"
     :href="source"
     target="_blank"
     rel="noopener noreferrer"
     class="source-link">
     <FontAwesomeIcon :icon="byPrefixAndName.fas['link']" /> Verified Source
  </a>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTriangleExclamation, faCheck, faLink, faCircleQuestion } from '@fortawesome/free-solid-svg-icons';

export default {
  name: 'AnalyzeResult',
  components: { FontAwesomeIcon },
  props: {
    explanation: {
      type: String,
      default: ''
    },
    source: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      byPrefixAndName: {
        fas: {
          'triangle-exclamation': faTriangleExclamation,
          'check': faCheck,
          'circle-question': faCircleQuestion,
          'link': faLink,
        }
      }
    };
  }
}
</script>

<!-- <style scoped>
.analyze-result {
  margin-top: 10px;
  background: #23293a;
  border-radius: 8px;
  padding: 10px 14px;
  color: #e0e6f6;
  font-size: 1rem;
}

.result-true {
	background: rgba(0, 255, 128, 0.15);
	border: 2px solid #00ff80;
	color: #00ff80;
	box-shadow: 0 0 10px rgba(0, 255, 128, 0.5);
}

.result-false {
	background: rgba(255, 64, 64, 0.15);
	border: 2px solid #ff4040;
	color: #ff4040;
	box-shadow: 0 0 10px rgba(255, 64, 64, 0.5);
	animation: shake 0.3s ease-in-out;
}

.result-unsure {
  background: rgba(255, 215, 0, 0.15);
  border: 2px solid #ffd700;
  color: #ffd700;
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
}

.icon {
	font-size: 1.2rem;
	font-weight: bold;
}

.source-link {
  display: inline-block;
  margin-top: 10px;
  padding: 10px 14px;
  border-radius: 8px;
  background: linear-gradient(90deg, #00ff80, #00b36b);
  color: #fff;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 0 6px rgba(0, 255, 128, 0.5);
}

.source-link:hover {
  background: linear-gradient(90deg, #00cc66, #008f4d);
  transform: translateY(-2px);
  box-shadow: 0 0 12px rgba(0, 255, 128, 0.7);
}

@keyframes shake {
  0% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  50% { transform: translateX(4px); }
  75% { transform: translateX(-4px); }
  100% { transform: translateX(0); }
}
</style> -->

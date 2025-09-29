<template>
	<div class="dashboard-layout">
		<side-bar/>
		<div class="main-area">
			<top-bar/>
			<div class="dashboard-content">
				<div>
					<h2>Facebook Account Authentication</h2>
                    <div class="analyzer">
                        <input type="text" v-model="url" placeholder="Paste Account URL here...">
                        <button class="analyze-btn" @click="analyzeAccount" :disabled="loading || !url.trim()">
                            {{ loading ? 'Analyzing...' : 'Analyze' }}
                        </button>
                        <div class="analyze-result" v-if="classification">
							<div v-if="classification">
								<strong>Classification:</strong> {{ classification }}
							</div>
                        </div>
                    </div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'FBAccountAnalyzer',
    data(){
        return{
            url: '',
            loading: false,
            classification: '',
        };
    },
    methods: {
        async analyzeAccount(){
            if (!this.url.trim()) return;
            this.loading = true;
            this.classification = '';

            try{
              const analyzeResponse = await fetch('/api/fbAnalyze', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({url: this.url})
              });

              if (!analyzeResponse.ok) throw new Error(`Analyze failed ${analyzeResponse.status}`);
              const data = await analyzeResponse.json();
              this.classification = data.classification.result;
              console.log("Classification:", this.classification);

            }catch(error) {
				this.classification = "Error analyzing URL";
              	console.error("Error during URL analysis:", error);
            } finally {
              	this.loading = false;
            }
        }
    }
}
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

.analyzer input {
  width: 100%;
  background: #181c24;
  color: #e0e6f6;
  border: 1.5px solid #444b5a;
  border-radius: 8px;
  padding: 10px;
  font-size: 1rem;
  margin-bottom: 12px;
  resize: vertical;
}
.analyzer .analyze-btn {
  background: linear-gradient(90deg, #4f8cff 60%, #00e6e6 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 8px 22px;
  font-size: 1.05rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
  margin-bottom: 10px;
}
.analyzer .analyze-btn:hover {
  background: linear-gradient(90deg, #3766c9 60%, #00b3b3 100%);
}
.analyzer .analyze-result {
  margin-top: 10px;
  background: #23293a;
  border-radius: 8px;
  padding: 10px 14px;
  color: #e0e6f6;
  font-size: 1rem;
}
</style>
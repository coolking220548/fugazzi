<template>
  <div class="dashboard-layout">
    <side-bar/>
    <div class="main-area">
        <top-bar/>
      <div class="dashboard-content">
        <section class="news-analysis widget">
          <h2>Recent News Analysis</h2>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Source</th>
                <th>Timestamp</th>
                <th>Label</th>
                <th>Confidence</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>WAN SQUAD DEPARTS FOR USA TO DEFEND TITLE</td>
                <td>EMTV</td>
                <td>2025-06-01 11:47</td>
                <td><span class="real-label">Real</span></td>
                <td>98%</td>
              </tr>
              <tr>
                <td>Akon to perform on September 16 in POM</td>
                <td>Facebook</td>
                <td>2025-05-18 09:30</td>
                <td><span class="fake-label">Fake</span></td>
                <td>87%</td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
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

.widget {
  background: rgba(30, 34, 54, 0.92);
  border-radius: 14px;
  box-shadow: 0 2px 12px 0 rgba(44,120,255,0.08);
  padding: 24px 28px;
  margin-bottom: 0;
  color: #e0e6f6;
}

.news-analysis table, .flagged-articles table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 12px;
}
.news-analysis th, .news-analysis td,
.flagged-articles th, .flagged-articles td {
  padding: 8px 10px;
  text-align: left;
  border-bottom: 1px solid #23293a;
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
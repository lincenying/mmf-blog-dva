import dva from 'dva'
import { browserHistory } from 'dva/router'

import router from './router.jsx'

import topics from './models/topics'

// 1. Initialize
const app = dva({
    history: browserHistory,
    onError(error) {
        console.error(error.stack)
    },
})

// 2. Plugins
//app.use({});

// 3. Model
app.model(topics)
// app.model(topic)

// 4. Router
app.router(router)

// 5. Start
app.start('#root')

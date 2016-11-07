import dva from 'dva'
import { browserHistory } from 'dva/router'

import router from './router.jsx'

import globals from './models/globals'
import topics from './models/topics'
import article from './models/article'
import comment from './models/comment'
import admin from './models/admin'

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
app.model(globals)
app.model(topics)
app.model(article)
app.model(comment)
app.model(admin)

// 4. Router
app.router(router)

// 5. Start
app.start('#root')

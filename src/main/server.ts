import { mongoHelper } from '@infra/db/mongodb'

mongoHelper.connect(process.env.MONGO_URL)
  .then(async () => {
    const app = (await import('./config/app')).app
    app.listen(process.env.SERVER_PORT, () =>
      console.log(
        `Server running at http://localhost:${process.env.SERVER_PORT}`
      )
    )
  })
  .catch(console.error)

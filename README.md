# End-to-end Fake News Classifier

### [Demo 🔗](https://fakenewsservice-ih2ql4rjjq-ew.a.run.app/)

### [Blog Post 🔗](https://hatem-hassan.com/blog/fullstack-nlp-building-and-deploying-end-to-end-fake-news-classifier)

## Building UI

```cd webapp && npm run build```

## Running service (+ Serving UI)

```gunicorn -t 120 -b :8080 app:app```

Will run the app on http://localhost:8080
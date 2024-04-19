from flask import Flask, request, jsonify
import requests
import secret_config as sc

app = Flask(__name__)

def get_paginated_news(page=1, page_size=9, search_query='Argentina'):
    start_index = (page - 1) * page_size
    url = f'https://newsapi.org/v2/everything?q={search_query}&language=es&from=2024-04-09&sortBy=publishedAt&apiKey={sc.NEWS_API_KEY}&pageSize={page_size}&page={page}'
    response = requests.get(url)
    data = response.json()
    articles = data['articles']
    return articles

@app.route('/api/news', methods=['GET'])
def get_news():
    page = int(request.args.get('page', 1))
    search_query = request.args.get('q', 'Argentina')

    articles = get_paginated_news(page=page, search_query=search_query)

    return jsonify({'articles': articles})

if __name__ == "__main__":
    app.run(debug=True)
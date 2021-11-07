import logging as logger
from flask import Blueprint, jsonify, request, Response
from .GoodReadsGraph import BuildGraph

main = Blueprint('main', __name__)
logger.debug("App starting")

BigGraph, titles_dict = BuildGraph()
# BigGraph, titles_dict = None, None
logger.debug("Graph is built service")

output_URL = ""

def large_url(url):
    """
    The URL path has an "s,m,l" in it, and
    we want the large url image
    """
    _split=url.split("/")
    _split[-2]=_split[-2][:-1]+"l"

    large_url = ""
    for segment in _split:
        large_url += segment +"/"

    return large_url[:-1]


@main.route('/input_book', methods=['POST'])
def input_book():
    # We get a request from our React App
    logger.debug("Starting service")
    _book = request.get_json(force=True)
    # We extract the title from our JSON
    _book_title = str(_book["title"])
    logger.debug("book: ", _book_title)
    # We use our dictionary to pull out a book Object
    try:
        _book_object = titles_dict[_book_title.lower()]["Book"]
        logger.debug(_book_object)
        # Grab the first entry, return it
        book_list = BigGraph._book2book(_book_object, N=6)
        book = book_list[0]
        logger.debug(book)

        # TODO info needed: title, authors, orig pub year, language, rating, rating cnt, img_url
        books_df = BigGraph.books
        similar_books = [b.book_id for b in book_list]
        data = books_df[books_df.book_id.isin(similar_books)].to_json(orient="records")

        # Set the global url to be the large version of the input url
        global output_URL
        output_URL = large_url(str(book.image_url))
        # Return the image URL to be displayed on our app
        #    NB: POST does not support anything else.
        return Response(data, mimetype='application/json')
    except Exception as e:
        logger.warning("Encountered exception: ", e)
        return "Error", 400

@main.route('/novel_novel', methods=['GET'])
def novel_novel():
    logger.debug("GET method returning output_url")
    return jsonify({"image_url": output_URL}), 200

@main.route('/', methods=['GET'])
def hello():
    return "Hello, World!", 200
# preprocessing
import timeit
from nltk.stem import WordNetLemmatizer
from nltk import pos_tag
from nltk.corpus import stopwords
from nltk.corpus import wordnet
import _pickle as pickle
import string
import nltk
nltk.data.path.append('./nltk_data')

start = timeit.default_timer()
with open("pickle/pipeline.pkl", 'rb') as f:
        pipeline = pickle.load(f)
        stop = timeit.default_timer()
        print('=> Pickle Loaded in: ', stop - start)


class PredictionModel:
    output = {}

    # constructor
    def __init__(self, text):
        self.output['original'] = text

    def predict(self):

        self.preprocess()
        self.pos_tag_words()

        # Merge text
        clean_and_pos_tagged_text = self.output['preprocessed'] + \
            ' ' + self.output['pos_tagged']

        self.output['prediction'] = 'FAKE' if pipeline.predict(
            [clean_and_pos_tagged_text])[0] == 0 else 'REAL'

        return self.output

    # Helper methods
    def preprocess(self):
        # lowercase the text
        text = self.output['original'].lower()

        # remove the words counting just one letter
        text = [t for t in text.split(" ") if len(t) > 1]

        # remove the words that contain numbers
        text = [word for word in text if not any(c.isdigit() for c in word)]

        # tokenize the text and remove puncutation
        text = [word.strip(string.punctuation) for word in text]

        # remove all stop words
        stop = stopwords.words('english')
        text = [x for x in text if x not in stop]

        # remove tokens that are empty
        text = [t for t in text if len(t) > 0]

        # pos tag the text
        pos_tags = pos_tag(text)

        # lemmatize the text
        text = [WordNetLemmatizer().lemmatize(t[0], self.get_wordnet_pos(t[1]))
                for t in pos_tags]

        # join all
        self.output['preprocessed'] = " ".join(text)

    def get_wordnet_pos(self, pos_tag):
        if pos_tag.startswith('J'):
            return wordnet.ADJ
        elif pos_tag.startswith('V'):
            return wordnet.VERB
        elif pos_tag.startswith('N'):
            return wordnet.NOUN
        elif pos_tag.startswith('R'):
            return wordnet.ADV
        else:
            return wordnet.NOUN

    def pos_tag_words(self):
        pos_text = nltk.pos_tag(
            nltk.word_tokenize(self.output['preprocessed']))
        self.output['pos_tagged'] = " ".join(
            [pos + "-" + word for word, pos in pos_text])

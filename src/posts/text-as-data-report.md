---
title: Note | Text-as-Data Coursework Report
date: 2021-08-25 23:12:50
tags:
- English
- Work
- Programming
- Machine Learning
- Python
---

Reddit is made of threads which contain posts generated by the users. Your aim in this task is to predict the sentiment polarity of each post individually. The exercise dataset contains target column called `sentiment.polarity` which can take 5 values: "very negative", "negative", "neutral", "positive" and "very positive" (multi-label classification/prediction).

Read dataset:
```python
train_data = pd.read_json("https://raw.githubusercontent.com/rpsoft/tad_course/main/reddit_sentiment_train.json")
validation_data = pd.read_json("https://raw.githubusercontent.com/rpsoft/tad_course/main/reddit_sentiment_validation.json")
test_data = pd.read_json("https://raw.githubusercontent.com/rpsoft/tad_course/main/reddit_sentiment_test.json")
```

## Q1
Use the text from the reddit posts (Known as “body”) to train classification models using the Scikit Learn package. The labels to predict are the `sentiment.polarity` for each post. Conduct experiments using the following combinations of classifier models and feature representations:
1. `Dummy Classifier` with `strategy="most_frequent"`
2. `Dummy Classifier` with `strategy="stratified"`
3. `LogisticRegression` with `One-hot vectorization`
4. `LogisticRegression` with `TF-IDF vectorization` (default settings)
5. `SVC Classifier` with `One-hot vectorization` (SVM with RBF kernel, default settings)
6. An ‘interesting’ classifier model and vectorisation of your choice with appropriate pre-processing

**Results** - For the above classifiers report the classifier accuracy as well as macro-averaged precision, recall, and F1 (to three decimal places). Show the overall results1 obtained by the classifiers on the training and test sets in one table, and highlight the best performance. For the best performing classifier (by macro F1 in test set) Include a bar chart graph with the F1 score for each class - (sentiment polarity labels on x-axis, F1 score on Y axis).

### Explore dataset
There are five types of `sentiment.ploraity` in the dataset: neutral, positive, negative, very positive and very negative. firstly, counts of the `sentiment.poalrity` columns of each of the three datasets were conducted and the results are shown in the table below:

|                | neutral | positive | negative | very positive | very negative |
|----------------|---------|----------|----------|---------------|---------------|
| training set   | 7679    | 3231     | 878      | 253           | 97            |
| validation set | 1961    | 845      | 215      | 73            | 15            |
| testing set    | 2514    | 1102     | 282      | 86            | 32            |

As can be seen from the chart, the distribution of species is uneven, especially the very small proportion of very positive and very negative, which may lead to poor training to result in a high FRP for these two species.

### Preprocessing
```python
nlp = spacy.load('en_core_web_sm')
nlp.remove_pipe('tagger')
nlp.remove_pipe('parser')

# download a stopword list
nltk.download('stopwords')

# tokenize
def spacy_tokenize(string):
  tokens = list()
  doc = nlp(string)
  for token in doc:
    tokens.append(token)
  return tokens

# normalize
def normalize(tokens):
  normalized_tokens = list()
  for token in tokens:
    normalized = token.text.lower().strip()
    if ((token.is_alpha or token.is_digit)):
      normalized_tokens.append(normalized)
  return normalized_tokens
  return normalized_tokens

# tokenize and normalize
def tokenize_normalize(string):
  return normalize(spacy_tokenize(string))

## Pass in the tokenizer as the tokenizer to the vectorizer.
## Create a one-hot encoding vectorizer.
one_hot_vectorizer = CountVectorizer(tokenizer=tokenize_normalize, binary=True)
train_features = one_hot_vectorizer.fit_transform(train_data['body'])

## This creates input features for our classification on all subsets of our collection.
validation_features = one_hot_vectorizer.transform(validation_data['body'])
test_features = one_hot_vectorizer.transform(test_data['body'])

train_labels = train_data['sentiment.polarity']
validation_labels = validation_data['sentiment.polarity']
test_labels = test_data['sentiment.polarity']
```

### Discussion of classifier performance
First we define a evaluation summary function to summarise the scores:

```python
def evaluation_summary(description, predictions, true_labels):
  print("Evaluation for: " + description)
  precision = precision_score(predictions, true_labels, average='weighted')
  recall = recall_score(predictions, true_labels, average='weighted')
  accuracy = accuracy_score(predictions, true_labels)
  f1_weighted = fbeta_score(predictions, true_labels, 1, average='weighted') #1 means f_1 measure
  f1_macro = fbeta_score(predictions, true_labels, 1, average='macro')
  print("Classifier '%s' has Acc=%0.3f P=%0.3f R=%0.3f F1_w=%0.3f F1_m=%0.3f" % (description,accuracy,precision,recall,f1_weighted,f1_macro))
  print(classification_report(predictions, true_labels, digits=3, zero_division = 0))
  print('\nConfusion matrix:\n',confusion_matrix(true_labels, predictions))
```

1. `Dummy Classifier` with `strategy="most_frequent"`

```python
dummy_mf = DummyClassifier(strategy='most_frequent')
```

```
0.625996015936255
Evaluation for: Dummy Majority
Classifier 'Dummy Majority' has Acc=0.626 P=1.000 R=0.626 F1_w=0.770 F1_m=0.154
```

2. `Dummy Classifier` with `strategy="stratified"`

```python
dummy_prior = DummyClassifier(strategy='stratified')
```

```
0.4676294820717131
Evaluation for: Dummy Prior
Classifier 'Dummy Prior' has Acc=0.462 P=0.463 R=0.462 F1_w=0.462 F1_m=0.190
```

3. `LogisticRegression` with `One-hot vectorization`

```python
lr = LogisticRegression(solver='saga', max_iter = 1000)
```

```
Evaluation for: LR onehot
Classifier 'LR onehot' has Acc=0.748 P=0.787 R=0.748 F1_w=0.763 F1_m=0.476
```

4. `LogisticRegression` with `TF-IDF vectorization` (default settings)

```python
ngram_vectorizer = TfidfVectorizer(tokenizer=tokenize_normalize)
train_features_idf = ngram_vectorizer.fit_transform(train_data['body'])

validation_features_idf = ngram_vectorizer.transform(validation_data['body'])
test_features_idf = ngram_vectorizer.transform(test_data['body'])

lr_idf = LogisticRegression(solver='saga', max_iter = 1000)
lr_idf_model = lr_idf.fit(train_features_idf, train_labels)
evaluation_summary("LR tf-idf", lr_idf_model.predict(test_features_idf), test_labels)
```

```
Evaluation for: LR tf-idf
Classifier 'LR tf-idf' has Acc=0.741 P=0.853 R=0.741 F1_w=0.780 F1_m=0.356
```

5. `SVC Classifier` with `One-hot vectorization` **(SVM with RBF kernel, default settings)**

```python
svc = SVC(kernel='rbf')
```

```
Evaluation for: SVC
Classifier 'SVC' has Acc=0.730 P=0.875 R=0.730 F1_w=0.782 F1_m=0.287
```

6. An ‘interesting’ classifier model and vectorisation of your choice with appropriate pre-processing

```python
knn = KNeighborsClassifier(n_neighbors=7)
```

```
Evaluation for: KNN
Classifier 'KNN' has Acc=0.634 P=0.991 R=0.634 F1_w=0.768 F1_m=0.171
```

As the results show, the classifier `LogisticRegression` with `One-hot vectorization` had the highest accuracy and the highest f1 scores under the weighted average and macro average. The generally low f1 scores may be due to the uneven distribution of the sample, and the unweighted mean may be heavily influenced by the distribution of the sample.
With respect to F1 (macro averaged), `LogisticRegression` with `One-hot vectorization` scored the highest, and below is the bar chart graph with the F1 score for each class. This result also confirms the above assumption.


## Q2
In this task you will improve the effectiveness of the `LogisticRegression` with `TF-IDF` vectorisation from Q1.
1. **Parameter tuning** - Tune the parameters for both the vectoriser and classifier on the validation set (or using CV-fold validation on the train).
Your search does **not** need to be exhaustive. Changing all parameters at once is expensive and slow (a full sweep is exponential in the number of parameters). Consider selecting the best parameters sequentially. The resulting tuned model should improve over the baseline TF-IDF model. Report the results in a table with the accuracy, macro-averaged precision, recall, and F1 on the **test data**. Discuss the parameters and values you tried, what helped and what did not and *explain why* this may be the case.
	* Classifier - **Regularisation** C value (typical values might be powers of 10 (from $10^{-3}$ to $10^5$)
	* Vectoriser - Parameters: `sublinear_tf` and `max_features` (vocabulary size) (in a range None to 50k)
	* Select another parameter of your choice from the classifier or vectoriser

2. **Error analysis** - Manually examine the predictions of your optimised classifier on the test set. Analyse the results for patterns and trends. Hypothesise why common classification errors are made. Report on your error analysis process and summarise your findings.

We have parameters:
1. `LogisticRegression`: `C` (typical values are powers of 10 (from $10^{-3}$ to $10^5$);
2. `TfidfVectorizer`: `sublinear_tf` (False or True) and `max_features` (in range None to 50k).

### Attempt parameter optimisation
Before the tuning, we have **f1_macro = 0.353**.
There we apply grid search aiming to find the best combination of parameters.

```python
prediction_pipeline = Pipeline([
              ('selector', ItemSelector(key='body')),
              ('tf-idf', TfidfVectorizer()),
              ('logreg', LogisticRegression(solver='saga', max_iter = 1000))
              ])

params = {
    'logreg__C': [0.001, 0.01, 0.1, 1, 10, 100, 1000, 10000, 100000],
    'tf-idf__sublinear_tf': [True, False],
    'tf-idf__max_features': range(0, 50000, 1000),
}

grid_search = GridSearchCV(prediction_pipeline, param_grid=params, n_jobs=1, verbose=1, scoring='f1_macro', cv=2)
grid_search.fit(train_data, train_labels)
best_parameters = grid_search.best_estimator_.get_params()
```

Besides the parameters above, `max_df` (of `TfidfVectorizer` in 2 ranges 0 to 1 and greater than 1) are explored to obtain higher score. A grid search was carried out on max_df using the optimal parameters already obtained above.
After the grid search, the best combination of parameters as follows is obtained:

```
Done 1800 out of 1800 | elapsed: 112.3min finished
logreg__C: 100
tf-idf__max_features: 3000
tf-idf__sublinear_tf: False
```

After the tuning, we have the **f1_macro** increased to **0.541**.

### Explore the predictions
For text data where the predicted result differs from the true value, it is printed out as below to analyse the exact cause.

```python
# print 20 pieces of mispredicted data
predicted = prediction_pipeline_tuned.predict(test_data)

p = 0
for i in range(len(test_labels)):
  if p < 20:
    if test_labels[i] != predicted[i]:
      print(test_data['body'][i] + '\n\nTrue label: ' + test_labels[i] + ' Predicted label: ' + predicted[i] + '\n')
      p += 1
  else:
    break
```


* Example 1

```
Even better, watch a VOD from [MLG Raleigh](http://tv.majorleaguegaming.com/videos/174-wr4-g2-kiwikaki-vs-nadagast-steppes-of-war-mlg-raleigh-starcraft-2)
The games, the casting, the maps... everything was fucking awful.  Amazing that it was just over one year ago.
True label: neutral Predicted label: positive
```

Analysis of the statements shows that the sentences contain URL, which may have an impact on the predictions. Also, *"Amazing that it was just over one year ago."* uses a positive word like amazing but expresses a negative opinion of the discussion, which could be one of the reasons for the wrong prediction.

* Example 2

```
Your name and your post do not correlate
True label: neutral Predicted label: very positive
```

It can be seen that the above sentence is a text unrelated to the content of the posting, and the model incorrectly predicts it as very positive. One reason for this may be that the number of samples labelled as *very positive* is very small, resulting in the model's poor prediction of a samples labelled as labels which are minority. The other reason might be that the sentence itself does not contain enough information to extract enough features.

## Q3
In this task your goal is to add **two features** to (try to) improve *sentiment polarity* classification performance obtained in Q2.
You must implement and describe two new classifier features and add them to the tuned model from Q2. Examples include adding other properties of the posts (or threads), leveraging embedding-based features, different vectorisation approaches, etc. Train the combined model and report accuracy, macro-averaged precision, recall, and F1 on the test data. Include a well-labeled confusion matrix. Discuss the result in reference to Q2 and what helped (or didn’t) and why you think so.

### Propose features
In this dataset, in addition to the "body" which contains the content of the postings, there are other features that may be useful for model training.
1. `title`: The title of the post. This is interrelated with body, so it may help in the training of the model.
2. `majority_type`: the type of thread. May be useful in the analysis of sentiment.
3. `author`: the username of the poster. The same sentiment polarity may appear when the
same user appears.
4. `sentiment.subjectivity`: the subjectivity of the posting; its value may reflect the sentiment polarity of the user's statement; for example, looking at the data, it is clear that a lower value may mean that the user tends to be more neutral.
The above features will be attempted.

### Train, validate and test models
We start by adding single feature from list above to try them out.

1. Add only `title`

```python
# add only title
prediction_pipeline_union = Pipeline([
        ('union', FeatureUnion(
          transformer_list=[
            ('title', Pipeline([
              ('selector', ItemSelector(key='title')),
              ('one-hot', TfidfVectorizer(norm='l1')), 
              ])),
            ('body', Pipeline([
              ('selector', ItemSelector(key='body')), 
              ('one-hot', TfidfVectorizer(sublinear_tf=False, max_features=3000, max_df=1200)), 
              ])),
        ])
        )
    ])
```

```
Evaluation for: LR tf-idf
Classifier 'LR tf-idf' has Acc=0.736 P=0.750 R=0.736 F1_w=0.742 F1_m=0.523
```

2. Add only `author`

```
Evaluation for: LR tf-idf
Classifier 'LR tf-idf' has Acc=0.738 P=0.776 R=0.738 F1_w=0.752 F1_m=0.501
```

3. Add only `majority_type`

```
Evaluation for: LR tf-idf
Classifier 'LR tf-idf' has Acc=0.750 P=0.757 R=0.750 F1_w=0.753 F1_m=0.530
```

4. Add only `sentiment.subjectivity`

```python
# add only sentiment.subjectivity

numeric_features = ['sentiment.subjectivity']
numeric_transformer = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='median')),
    ('scaler', StandardScaler())])

text_features = ['body']
text_transformer = TfidfVectorizer(sublinear_tf=False, max_features=3000, max_df=1200)

preprocessor = ColumnTransformer(
    transformers=[
        ('num', numeric_transformer, numeric_features),
        ('tfidf_1', text_transformer, 'body'),],
                    remainder='drop')


## Run evaluation with classifier
def evaluateClassifier(classif):
  clf = Pipeline(steps=[('preprocessor', preprocessor),
                        ('classifier', classif)])

  clf.fit(train_data, train_labels)
  y_pred = clf.predict(test_data)
  print(metrics.classification_report(test_labels, y_pred, zero_division=0))

evaluateClassifier(LogisticRegression(solver='saga', max_iter = 1000, C=100))
```

```
Evaluation for: LR tf-idf
Classifier 'LR tf-idf' has Acc=0.790 P=0.780 R=0.790 F1_w=0.790 F1_m=0.600
```

We can see that with the addition of a single feature, `sentiment.subjectivity` has the best effect on the model's effectiveness, raising the f1 score of the model's macro average from 0.541 to 0.6.
Therefore, if two features are to be added, `majority_type` and `subjectivity` are probably the best combination of the features listed in the table above.

5. Add two features

```python
# add sentiment.subjectivity and majority_type

numeric_features = ['sentiment.subjectivity']
numeric_transformer = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='median')),
    ('scaler', StandardScaler())])

text_features = ['body', 'majority_type']
text_transformer = TfidfVectorizer(sublinear_tf=False, max_features=3000, max_df=1200)

preprocessor = ColumnTransformer(
    transformers=[
        ('num', numeric_transformer, numeric_features),
        ('tfidf_1', text_transformer, 'body'),
        ('tfidf_2', text_transformer, 'majority_type')],
                    remainder='drop')


## Run evaluation with classifier
def evaluateClassifier(classif):
  clf = Pipeline(steps=[('preprocessor', preprocessor),
                        ('classifier', classif)])

  clf.fit(train_data, train_labels)
  y_pred = clf.predict(test_data)
  print(metrics.classification_report(test_labels, y_pred, zero_division=0))

evaluateClassifier(LogisticRegression(solver='saga', max_iter = 1000, C=100))
```

```
Evaluation for: LR tf-idf
Classifier 'LR tf-idf' has Acc=0.790 P=0.780 R=0.790 F1_w=0.790 F1_m=0.600
```

### Performance analysis
Comparing the two results shows that the combination of added features has improved all the metrics of the model. Also, there is a slight improvement on the aforementioned poor prediction of a minority labels caused by the uneven sample distribution. Specifically, the proportion improved in scores predicting labels *very positive* and *very negative* labels is greater than that in scores of label neutral.


-End-
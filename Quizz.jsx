import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Charger les questions du quiz depuis une source de données (par exemple, un fichier JSON)

    const fetchedQuestions = [
      {
        question: 'Quelle est la capitale de la France ?',
        options: ['Paris', 'Londres', 'Berlin', 'Rome'],
        correctAnswer: 'Paris',
      },
      {
        question: 'Qui a peint La Joconde ?',
        options: ['Pablo Picasso', 'Leonardo da Vinci', 'Vincent van Gogh', 'Salvador Dalí'],
        correctAnswer: 'Leonardo da Vinci',
      },
      // Ajoutez d'autres questions ici
    ];

    setQuestions(fetchedQuestions);
  }, []);

  const handleAnswerSelection = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }

    setSelectedAnswer(null);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const renderQuiz = () => {
    if (currentQuestionIndex >= questions.length) {
      // Afficher le score final si toutes les questions ont été répondues
      return (
        <View style={styles.quizContainer}>
          <Text style={styles.finalScoreText}>Score final : {score}/{questions.length}</Text>
        </View>
      );
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
      <View style={styles.quizContainer}>
        <Text style={styles.questionText}>{currentQuestion.question}</Text>
        {currentQuestion.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedAnswer === option ? styles.selectedOptionButton : null,
            ]}
            onPress={() => handleAnswerSelection(option)}
            disabled={selectedAnswer !== null}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={handleNextQuestion}
          disabled={selectedAnswer === null}
        >
          <Text style={styles.nextButtonText}>Suivant</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return <View style={styles.container}>{renderQuiz()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  quizContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  optionButton: {
    width: '100%',
    backgroundColor: '#e1e1e1',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  selectedOptionButton: {
    backgroundColor: '#b3e5fc',
  },
  optionText: {
    fontSize: 16,
  },
  nextButton: {
    backgroundColor: '#2196f3',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 20,
  },
  nextButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  finalScoreText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Quiz;

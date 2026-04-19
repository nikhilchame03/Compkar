import { gql } from "@apollo/client";

export const GET_SUBJECTS = gql`
  query GetSubjects {
    subjects {
      id
      exam
      name
    }
  }
`;

export const GET_TOPICS = gql`
  query GetTopics {
    topics {
      id
      name
      subject {
        id
        name
        exam
      }
    }
  }
`;

export const GET_QUESTIONS = gql`
  query GetQuestions {
    questions {
      id
      serialNumber
      exam
      difficulty
      title
      statement
      explanation
      subject {
        id
        name
      }
      topic {
        id
        name
      }
    }
  }
`;

export const GET_QUESTION_BY_SERIAL = gql`
  query GetQuestionBySerial($serial: Int!) {
    questionBySerial(serial: $serial) {
      id
      serialNumber
      exam
      difficulty
      title
      statement
      explanation
      subject {
        id
        name
      }
      topic {
        id
        name
      }
    }
  }
`;

export const GET_DAILY_QUESTIONS = gql`
  query GetDailyQuestions {
    dailyQuestions {
      id
      date
      question {
        id
        title
      }
    }
  }
`;

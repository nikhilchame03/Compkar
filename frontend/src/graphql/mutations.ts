import { gql } from "@apollo/client";

export const CREATE_SUBJECT = gql`
  mutation CreateSubject($exam: String!, $name: String!) {
    createSubject(exam: $exam, name: $name) {
      subject {
        id
        exam
        name
      }
    }
  }
`;

export const UPDATE_SUBJECT = gql`
  mutation UpdateSubject($id: Int!, $exam: String, $name: String) {
    updateSubject(id: $id, exam: $exam, name: $name) {
      subject {
        id
        exam
        name
      }
    }
  }
`;

export const DELETE_SUBJECT = gql`
  mutation DeleteSubject($id: Int!) {
    deleteSubject(id: $id) {
      ok
    }
  }
`;

export const CREATE_TOPIC = gql`
  mutation CreateTopic($subjectId: Int!, $name: String!) {
    createTopic(subjectId: $subjectId, name: $name) {
      topic {
        id
        name
      }
    }
  }
`;

export const UPDATE_TOPIC = gql`
  mutation UpdateTopic($id: Int!, $subjectId: Int, $name: String) {
    updateTopic(id: $id, subjectId: $subjectId, name: $name) {
      topic {
        id
        name
      }
    }
  }
`;

export const DELETE_TOPIC = gql`
  mutation DeleteTopic($id: Int!) {
    deleteTopic(id: $id) {
      ok
    }
  }
`;

export const CREATE_QUESTION = gql`
  mutation CreateQuestion(
    $exam: String!
    $subjectId: Int!
    $topicId: Int!
    $difficulty: String!
    $title: String!
    $statement: String!
    $optionA: String!
    $optionB: String!
    $optionC: String!
    $optionD: String!
    $correctOption: String!
    $isPublished: Boolean
  ) {
    createQuestion(
      exam: $exam
      subjectId: $subjectId
      topicId: $topicId
      difficulty: $difficulty
      title: $title
      statement: $statement
      optionA: $optionA
      optionB: $optionB
      optionC: $optionC
      optionD: $optionD
      correctOption: $correctOption
      isPublished: $isPublished
    ) {
      question {
        id
        title
      }
    }
  }
`;

export const UPDATE_QUESTION = gql`
  mutation UpdateQuestion($id: Int!, $title: String, $difficulty: String, $isPublished: Boolean) {
    updateQuestion(id: $id, title: $title, difficulty: $difficulty, isPublished: $isPublished) {
      question {
        id
        title
      }
    }
  }
`;

export const DELETE_QUESTION = gql`
  mutation DeleteQuestion($id: Int!) {
    deleteQuestion(id: $id) {
      ok
    }
  }
`;

export const CREATE_DAILY_QUESTION = gql`
  mutation CreateDailyQuestion($date: Date!, $questionId: Int!) {
    createDailyQuestion(date: $date, questionId: $questionId) {
      dailyQuestion {
        id
        date
      }
    }
  }
`;

export const UPDATE_DAILY_QUESTION = gql`
  mutation UpdateDailyQuestion($id: Int!, $date: Date, $questionId: Int) {
    updateDailyQuestion(id: $id, date: $date, questionId: $questionId) {
      dailyQuestion {
        id
        date
      }
    }
  }
`;

export const DELETE_DAILY_QUESTION = gql`
  mutation DeleteDailyQuestion($id: Int!) {
    deleteDailyQuestion(id: $id) {
      ok
    }
  }
`;

export const CREATE_ATTEMPT = gql`
  mutation CreateAttempt($userId: Int!, $questionId: Int!, $selectedOption: String!) {
    createAttempt(userId: $userId, questionId: $questionId, selectedOption: $selectedOption) {
      attempt {
        id
        selectedOption
      }
    }
  }
`;

export const UPDATE_ATTEMPT = gql`
  mutation UpdateAttempt($id: Int!, $selectedOption: String) {
    updateAttempt(id: $id, selectedOption: $selectedOption) {
      attempt {
        id
        selectedOption
      }
    }
  }
`;

export const DELETE_ATTEMPT = gql`
  mutation DeleteAttempt($id: Int!) {
    deleteAttempt(id: $id) {
      ok
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($email: String!, $password: String!) {
    createUser(email: $email, password: $password) {
      user {
        id
        email
        fullName
        isActive
        dateJoined
      }
    }
  }
`;

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
        email
        fullName
        isActive
        dateJoined
      }
    }
  }
`;

export const LOGOUT = gql`
  mutation Logout {
    logout {
      ok
    }
  }
`;

pipeline {
    agent any
    stages {
        stage('build') {
            steps {
                sh 'npm run install-all'
            }
        }
        stage('run') {
            steps {
                sh 'npm start'
            }
        }
    }
}

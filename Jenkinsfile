pipeline {
    agent any
    stages {
        stage('build') {
            steps {
                sh 'npm install-all'
            }
        }
        stage('run') {
            steps {
                sh 'npm start'
            }
        }
    }
}

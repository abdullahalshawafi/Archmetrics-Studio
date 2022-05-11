pipeline {
    agent any
    environment {
        header = "AccessToken"
        AccessToken = "LoginAccess"
        CLOUD_STORAGE_PATH = "https://storage.googleapis.com/archmetrics/"
        PORT=80
        REACT_APP_BASE_URL= "www.archmetrics.org/api"
    }
    stages {
        stage('build') {
            steps {
                sh 'npm run install-all'
            }
        }
        stage('run') {
            steps {
                sh 'sudo npm start'
            }
        }
    }
}

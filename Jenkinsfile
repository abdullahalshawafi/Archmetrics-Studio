pipeline {
    agent any
    environment {
        githubSecret = credentials("714a2807-4f4f-4d9f-8fba-72347597b7be")
    }
    stages {
        stage("fetch"){
            steps{
                echo "========Fetch github========"
                sh """ pwd """
                git branch: "main", url: "https://${githubSecret}@github.com/abdullahalshawafi/Archmetrics-Studio.git"
            }
            post{
                success{
                    sh """
                        touch server/.env
                        cp ../Server.txt server/.env
                        touch client/src/.env
                        cp ../Client.txt client/src/.env
                        
                    """
                }
            }
        }

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

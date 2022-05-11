pipeline {
    agent any
    environment {
        Cred_User = credentials("Cred_User")
        Cred_Token = credentials("Cred_Token")        
    }
    stages {
        stage("fetch"){
            steps{
                echo "========Fetch github========"
                sh """ pwd """
                git branch: "main", url: "https://${Cred_User}:${Cred_Token}@github.com/abdullahalshawafi/Archmetrics-Studio.git"
            }
            post{
                success{
                    sh """
                        ls
                        touch server/.env
                        cd 
                        ls
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

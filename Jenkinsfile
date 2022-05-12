pipeline {
    agent any
    environment {
        Cred_User = credentials("Cred_User")
        Cred_Token = credentials("Cred_Token")
        header = credentials("Header_env")
        AccessToken = credentials("AccessToken")  
        CLOUD_STORAGE_PATH = credentials("CLOUD_STORAGE_PATH")
        DB_URL = credentials("DB_URL")

    }
    triggers {
        githubPush()
    }
    stages {
        stage("fetch"){
            steps{
                echo "========pull github========"
                sh "pwd"
                sh "git pull https://${Cred_User}:${Cred_Token}@github.com/abdullahalshawafi/Archmetrics-Studio.git"
            }
        }

     

        stage('build back env') {
            steps {
                sh """
                        touch server/.env
                        echo header=${header} > server/.env
                        echo AccessToken=${AccessToken} >> server/.env
                        echo CLOUD_STORAGE_PATH=${CLOUD_STORAGE_PATH} >> server/.env
                        echo DB_URI=${DB_URL} >> server/.env
                        echo PORT=80 >> server/.env
                        echo NODE_ENV="production" >> server/.env
                """
            }
        }

        stage('build front env') {
            steps {
                sh """
                            ls
                            touch client/.env
                            echo REACT_APP_BASE_URL=http://www.archmetrics.org/api > client/.env
                    """
            }
        }
        
        stage('build') {
            steps {
                sh 'sudo npm run install-all'
            }
        }
        
        stage('run') {
            steps {
                sh 'sudo pm2 start server/app.js '
            }
        }
    }
}

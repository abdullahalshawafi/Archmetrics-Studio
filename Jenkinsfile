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

         stage('Remove Previous node'){
            steps{
               sh """
                    sudo pm2 stop server/app.js 
                    sudo pm2 delete server/app.js 
                    sudo pm2 save --force
                """
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
                sh """
                    sudo pm2 startup
                    sudo env PATH=$PATH:/home/mohamed_magdy/.nvm/versions/node/v14.18.2/bin /home/mohamed_magdy/.nvm/versions/node/v14.18.2/lib/node_modules/pm2/bin/pm2 startup systemd -u mohamed_magdy --hp /home/mohamed_magdy  
                    sudo BUILD_ID=dontKillMe pm2 start server/app.js 
                    sudo pm2 save --force
                """
            }
        }
    }
}

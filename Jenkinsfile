pipeline {
    agent any
    environment {
        Cred_User = credentials("Cred_User")
        Cred_Token = credentials("Cred_Token")
        Header_env = credentials("Header_env")
        AccessToken = credentials("AccessToken")  
        CLOUD_STORAGE_PATH = credentials("CLOUD_STORAGE_PATH")  

    }
    stages {
        stage("fetch"){
            steps{
                echo "========Fetch github========"
                git branch: "main", url: "https://${Cred_User}:${Cred_Token}@github.com/abdullahalshawafi/Archmetrics-Studio.git"
            }
            post{
                success{
                    sh """
                        ls
                        touch server/.env
                        echo header = ${Header_env} > server/.env
                        echo AccessToken = ${AccessToken} >> server/.env
                        echo CLOUD_STORAGE_PATH = ${CLOUD_STORAGE_PATH} >> server/.env
                    """
                }
            }
        }

    stage('build') {
        steps {
            sh 'cat server/.env'
        }
    }}
}

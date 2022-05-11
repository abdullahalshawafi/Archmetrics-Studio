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
                sh """ pwd """
                git branch: "main", url: "https://${Cred_User}:${Cred_Token}@github.com/abdullahalshawafi/Archmetrics-Studio.git"
            }
            post{
                success{
                    sh """
                        ls
                        cat server/.env
                        header = ${Header_env}
                        AccessToken = ${AccessToken}
                        CLOUD_STORAGE_PATH = ${CLOUD_STORAGE_PATH}
                    """
                }
            }
        }

    stage('build') {
        steps {
            sh 'echo server/.env'
        }
    }}
}

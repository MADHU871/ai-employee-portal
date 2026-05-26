pipeline {

    agent any

    stages {

        stage('Git Checkout') {

            steps {
                git 'https://github.com/MADHU871/ai-employee-portal.git'
            }
        }

        stage('Docker Build') {

            steps {

                sh '''
                cd backend

                docker build -t employee-backend .
                '''
            }
        }

        stage('Docker Run') {

            steps {

                sh '''
                docker stop employee-container || true

                docker rm employee-container || true

                docker run -d \
                --name employee-container \
                -p 5000:5000 \
                employee-backend
                '''
            }
        }
    }
}
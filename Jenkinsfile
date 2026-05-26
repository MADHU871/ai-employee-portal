pipeline {

    agent any

    environment {

        IMAGE_NAME = "employee-backend"
        CONTAINER_NAME = "employee-container"

    }

    stages {

        stage('Git Checkout') {

            steps {

                echo 'Cloning GitHub Repository...'

                git branch: 'main',
                url: 'https://github.com/MADHU871/ai-employee-portal.git'
            }
        }

        stage('Check Files') {

            steps {

                sh '''
                pwd
                ls -la
                '''
            }
        }

        stage('Docker Build') {

            steps {

                echo 'Building Docker Image...'

                sh '''
                cd backend

                docker build -t $IMAGE_NAME .
                '''
            }
        }

        stage('Docker Stop Old Container') {

            steps {

                echo 'Stopping Old Container...'

                sh '''
                docker stop $CONTAINER_NAME || true

                docker rm $CONTAINER_NAME || true
                '''
            }
        }

        stage('Docker Run New Container') {

            steps {

                echo 'Running New Container...'

                sh '''
                docker run -d \
                --name $CONTAINER_NAME \
                -p 5001:5000 \
                $IMAGE_NAME
                '''
            }
        }

        stage('Docker Status') {

            steps {

                sh '''
                docker ps
                '''
            }
        }
    }

    post {

        success {

            echo 'Pipeline Executed Successfully!'
        }

        failure {

            echo 'Pipeline Failed!'
        }
    }
}
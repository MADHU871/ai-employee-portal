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

        stage('Check Project Files') {

            steps {

                sh '''
                pwd

                ls -la

                echo "Frontend Files"

                ls frontend

                echo "Backend Files"

                ls backend
                '''
            }
        }

        stage('Frontend Install Dependencies') {

            steps {

                echo 'Installing Frontend Packages...'

                sh '''
                cd frontend

                npm install
                '''
            }
        }

        stage('Frontend Build') {

            steps {

                echo 'Building React Frontend...'

                sh '''
                cd frontend

                npm run build
                '''
            }
        }

        stage('Docker Build Backend') {

            steps {

                echo 'Building Docker Image...'

                sh '''
                cd backend

                docker build -t $IMAGE_NAME .
                '''
            }
        }

        stage('Stop Old Container') {

            steps {

                echo 'Stopping Old Docker Container...'

                sh '''
                docker stop $CONTAINER_NAME || true

                docker rm $CONTAINER_NAME || true
                '''
            }
        }

        stage('Run New Container') {

            steps {

                echo 'Running New Docker Container...'

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

                echo 'Checking Docker Container Status...'

                sh '''
                docker ps
                '''
            }
        }
    }

    post {

        success {

            echo 'CI/CD Pipeline Executed Successfully!'
        }

        failure {

            echo 'Pipeline Failed!'
        }
    }
}
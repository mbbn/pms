pipeline {
    agent {
        node {
            label '192.168.10.61'
        }
    }
    stages {
        stage('Build') {
            steps {
                echo "Build"
            }
        }
        stage('SonarQube analysis') {
            steps {
                echo "SonarQube analysis"
            }
        }
        stage('Artifact Repository') {
            steps {
                echo "Artifact Repository"
            }
        }
        stage('Deployment to Test Environment') {
            steps {
                echo "Deployment to Test Environment"
            }
        }
        stage('Functional Testing') {
            steps {
                echo "Functional Testing"
            }
        }
        stage('Integration Testing') {
            steps {
                echo "Integration Testing"
            }
        }
        stage('Performance Testing') {
            steps {
                echo "Performance Testing"
            }
        }
    }
}
pipeline {
    agent any
    tools {nodejs "npm"}
    environment {
        serviceName = 'user-portal'
        //awsRegion = 'us-east-1'
        commitIDShort = sh(returnStdout: true, script: "git rev-parse --short HEAD")
    }
    stages {
        stage('Install Dependencies and Test') {
            steps {
                sh 'npm install'
                sh 'npm test --code-coverage'
                sh 'echo "Testing..."' 
            }
        }
        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQubeServer') {
                    sh 'npm run sonar'
                }
            }
        }
        stage('Quality Gate') {
            steps {
                timeout(time: 10, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
    //     stage('Docker Image Build and ECR Image Push') {
    //         steps {
    //             withCredentials([string(credentialsId: 'awsAccountNumber', variable: 'awsID')]) {
    //                 sh '''
    //                     # authenticate aws account
    //                     aws ecr get-login-password --region ${awsRegion} | docker login --username AWS --password-stdin ${awsID}.dkr.ecr.${awsRegion}.amazonaws.com
    //                     docker context use default
    //                     docker build -t ${awsID}.dkr.ecr.us-east-1.amazonaws.com/${serviceName}:${commitIDShort} .
    //                     docker push ${awsID}.dkr.ecr.us-east-1.amazonaws.com/${serviceName}:${commitIDShort}
    //                     docker build -t ${awsID}.dkr.ecr.us-east-1.amazonaws.com/${serviceName}:latest .
    //                     docker push ${awsID}.dkr.ecr.us-east-1.amazonaws.com/${serviceName}:latest
    //                 '''
    //             }
    //         }
    //     }
    // }
        post {
            success {
                sh 'Finished'
            }
        }
    }
}
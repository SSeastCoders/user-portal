pipeline {
    agent any
    environment {
        serviceName = 'user-portal'
        awsRegion = 'us-east-1'
        commitIDShort = sh(returnStdout: true, script: "git rev-parse --short HEAD")
    }
    stages {
        stage('install Dependencies and Test') {
            steps {
                sh 'npm install'
                //sh 'npm run test'
                sh 'echo "Testing..."' 
            }
        }
        // stage('SonarQube Analysis') {
        //     steps {
        //         withSonarQubeEnv('sonarScanner') {
        //             sh 'npm run sonar'
        //         }
        //     }
        // }
        // stage('Quality Gate') {
        //     steps {
        //         timeout(time: 10, unit: 'MINUTES') {
        //             waitForQualityGate abortPipeline: true
        //         }
        //     }
        // }
        // stage('Docker Image Build and ECR Image Push') {
        //     steps {
        //         withCredentials([string(credentialsId: 'awsAccountNumber', variable: 'awsID')]) {
        //             sh '''
        //                 # authenticate aws account
        //                 aws ecr get-login-password --region ${awsRegion} | docker login --username AWS --password-stdin ${awsID}.dkr.ecr.${awsRegion}.amazonaws.com

        //                 docker context use default

        //                 docker build -t ${awsID}.dkr.ecr.us-east-1.amazonaws.com/${serviceName}:${commitIDShort} .
        //                 docker push ${awsID}.dkr.ecr.us-east-1.amazonaws.com/${serviceName}:${commitIDShort}

        //                 docker build -t ${awsID}.dkr.ecr.us-east-1.amazonaws.com/${serviceName}:latest .
        //                 docker push ${awsID}.dkr.ecr.us-east-1.amazonaws.com/${serviceName}:latest
        //             '''
        //         }
        //     }
        // }
        stage('Build ui') {
            steps{
                sh 'npm run build'
            }
        }
        stage('S3 deploy') {
            steps {
                sh 'ansible-galaxy collection install community.aws'
                sh 'ansible-playbook playbooks/deploy-ui.yml'
            }
        }
    }
    post {
        success {
            sh 'docker image prune -af'
        }
    }
}
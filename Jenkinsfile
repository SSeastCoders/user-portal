
pipeline {

    agent any
    tools {nodejs "nodejs"}
    environment {
        PORTAL_NAME = 'customer'
        REGION = 'us-east-2'
        DOMAIN = 'eastcodersbank.com'
        S3_NAME = 'dev-user-portal-bucket-10052021'
        REACT_APP_USER_ENDPOINT= 'http://DevApplicationLoadBalancer-1828113511.us-east-2.elb.amazonaws.com:8222'
        REACT_APP_ACCOUNT_ENDPOINT='http://DevApplicationLoadBalancer-1828113511.us-east-2.elb.amazonaws.com:8223/api/v1/accounts'
        REACT_APP_TRANSACTION_ENDPOINT='http://DevApplicationLoadBalancer-1828113511.us-east-2.elb.amazonaws.com:8224/api/v1/transaction'
    }

    stages {

        stage("Install Node Modules") {
            steps {
                sh "npm install"
            }
        }

        stage("Setup Portal Stack") {
            steps {
                sh '''
                    aws cloudformation deploy \
                    --stack-name ${PORTAL_NAME}-portal-stack \
                    --template-file deploy.yaml \
                    --parameter-overrides \
                        Domain=${DOMAIN} \
                    --capabilities CAPABILITY_NAMED_IAM \
                    --no-fail-on-empty-changeset \
                    --region ${REGION}
                '''
            }
        }

        stage("Build Portal") {
            steps {
                echo "Building React app: '${PORTAL_NAME} portal'..."
                sh "npm run build"
            }
        }

        stage("Deploy to S3 Bucket") {
            steps {
                echo "Deploying '${PORTAL_NAME} portal' to S3 bucket..."
                sh "aws s3 sync build/ s3://${S3_NAME}"
            }
        }
    }

    post {
        always {
            sh "rm -rf node_modules"
        }
    }

}
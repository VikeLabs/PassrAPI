import * as cdk from '@aws-cdk/core';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as lambda from '@aws-cdk/aws-lambda';
import constants from './constants';

interface DBStackProps extends cdk.StackProps {
	envPrefix: string;
	prod?: boolean;
	apiHandler: lambda.IFunction;
}

export class DBStack extends cdk.Stack {
	constructor(scope: cdk.Construct, id: string, props: DBStackProps) {
		super(scope, id, props);
		const partitionKey: dynamodb.Attribute = {
			name: 'id',
			type: dynamodb.AttributeType.STRING,
		};

		const defaultTableProps: dynamodb.TableProps = {
			partitionKey,
			billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
			pointInTimeRecovery: !!props.prod, // Point in time recovery only on prod
		};

		const userTable = new dynamodb.Table(
			this,
			`${constants.PROJECT_PREFIX}-${props.envPrefix}-UserTable`,
			defaultTableProps
		);

		const semesterTable = new dynamodb.Table(
			this,
			`${constants.PROJECT_PREFIX}-${props.envPrefix}-SemesterTable`,
			defaultTableProps
		);

		const courseTable = new dynamodb.Table(
			this,
			`${constants.PROJECT_PREFIX}-${props.envPrefix}-CourseTable`,
			defaultTableProps
		);

		const courseItemTable = new dynamodb.Table(
			this,
			`${constants.PROJECT_PREFIX}-${props.envPrefix}-CourseItemTable`,
			defaultTableProps
		);

		userTable.grantReadWriteData(props.apiHandler);
		semesterTable.grantReadWriteData(props.apiHandler);
		courseTable.grantReadWriteData(props.apiHandler);
		courseItemTable.grantReadWriteData(props.apiHandler);
	}
}

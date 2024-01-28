import { Alert as BootstrapAlert } from 'react-bootstrap';

const Alert = ({ message, transactionHash, variant, setShowAlert }) => {
	return(
		<BootstrapAlert
			variant={variant}
			onClose={() => setShowAlert(false)}
			dismissible
			className='alert'
		>
			<BootstrapAlert.Heading>{message}</BootstrapAlert.Heading>

			<hr />

			{transactionHash && (
				<p>
					{transactionHash.slice(0,6) + '...' + transactionHash.slice(60, 66)}
				</p>
			)}

		</BootstrapAlert>
	)
}

export default Alert;
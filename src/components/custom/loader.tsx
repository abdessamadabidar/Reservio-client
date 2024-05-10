import { tailChase } from 'ldrs'

tailChase.register()


export const Loader = () => {
	return <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
		<l-tail-chase
			size="60"
			speed="1.75"
			color="#2563eb"
		></l-tail-chase>
	</div>


}
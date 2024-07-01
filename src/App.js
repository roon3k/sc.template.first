import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import './assets/stylesheets/main.css'
import AppRouter from './components/AppRouter'
import { useTelegram } from './hooks/useTelegram'

const App = observer(() => {
	const { expandApp } = useTelegram()
	useEffect(() => {
		expandApp()
	}, [])

	return (
		<BrowserRouter>
			<div className={'app wrapper'}>
				<AppRouter />
			</div>
		</BrowserRouter>
	)
})

export default App

import { useEffect, useState } from 'react';

/** * Specific statuses for individual letters.
 * 'pending' is our frontend-only state for typing/submitting.
 */
type TileStatus = 'correct' | 'present' | 'absent' | 'pending';

/** * The overall state of the game instance.
 */
type GameResult = 'play' | 'win' | 'lose';

type GameTile = {
	letter: string; // [A-Z] or empty string ""
	status: TileStatus;
	willTransition?: boolean;
};

/**
 * Represents a single guess/row.
 * Usually a fixed length of 5.
 */
type Attempt = [GameTile, GameTile, GameTile, GameTile, GameTile];

type GameData = {
	/** Unique identifier for the game session */
	readonly id: string;

	/** Whether the user is still playing or the game has ended */
	readonly result: GameResult;

	/** Number of tries the user has left (e.g., starts at 6) */
	readonly remaining: number;

	/** * The Matrix: An array of rows.
	 * Each row is an array of letters with their status.
	 */
	readonly moves: Attempt[];
};

const Wordle = () => {
	const [shouldFlip, setShouldFlip] = useState<boolean>(false);
	const [remainingTurns, setRemainTurns] = useState<Attempt[] | null>();

	const [gameData, setGameData] = useState<GameData>({
		id: 'game_88ac_2026',
		result: 'play',
		remaining: 4,
		moves: [
			// --- Attempt 1: "PLANT" ---
			// Result: All Gray (Absent) except nothing.
			[
				{ letter: 'P', status: 'absent' },
				{ letter: 'L', status: 'absent' },
				{ letter: 'A', status: 'absent' },
				{ letter: 'N', status: 'absent' },
				{ letter: 'T', status: 'present' }, // 'T' is in STORM, but not here
			],
			// --- Attempt 2: "SHOUT" ---
			// Result: S and O are correct. T is present.
			// Note: The 'M' was revealed via a HINT (the user clicked hint for slot 4)
			[
				{ letter: 'S', status: 'correct' },
				{ letter: 'H', status: 'absent' },
				{ letter: 'O', status: 'correct' },
				{ letter: 'R', status: 'present' }, // R is in STORM, but not here
				{ letter: 'M', status: 'correct' }, // <--- REVEALED VIA HINT
			],
		],
	});
	useEffect(() => {
		console.log('setting remaining turns');
		setRemainTurns([
			...Array.from({ length: gameData.remaining }, (): Attempt => {
				return [
					{ letter: '', status: 'pending' },
					{ letter: '', status: 'pending' },
					{ letter: '', status: 'pending' },
					{ letter: '', status: 'pending' },
					{ letter: '', status: 'pending' },
				];
			}),
		]);
	}, [gameData.remaining]);

	const getStatusClassName = (status: TileStatus) => {
		const statusColor: Record<TileStatus, string> = {
			correct: 'green',
			present: 'yellow',
			absent: 'gray',
			pending: 'white',
		};

		return statusColor[status] || 'white';
	};

	// simulate user entering a new guess word

	const simulateNextGuess = (word: string) => {
		const letters = word.split('');
		console.log(remainingTurns);
		letters.forEach((letter, index) => {
			setTimeout(() => {
				setRemainTurns((prev) => {
					if (!prev) return prev;

					const activeRowIndex = 0; // Or find your index

					// Create a copy of the specific row
					const newRow = [...prev[activeRowIndex]] as Attempt;

					// Update the specific letter
					newRow[index] = { letter: letter.toUpperCase(), status: 'pending' };

					// Return the full array with the new row swapped in
					return prev.map((row, i) => (i === activeRowIndex ? newRow : row));
				});
			}, index * 150);
		});
	};

	const simulateWordCheckResponse = () => {
		setRemainTurns((prev) => {
			if (!prev) return prev;

			console.log(prev);

			return prev.with(0, [
				{
					letter: 'S',
					status: 'correct',
					willTransition: true,
				},
				{
					letter: 'M',
					status: 'present',
					willTransition: true,
				},
				{
					letter: 'A',
					status: 'absent',
					willTransition: true,
				},
				{
					letter: 'R',
					status: 'correct',
					willTransition: true,
				},
				{
					letter: 'T',
					status: 'absent',
					willTransition: true,
				},
			]);
		});

		setShouldFlip(true);
	};

	const simulateSyncWithBackend = () => {
		requestAnimationFrame(() => {
			setShouldFlip(false);

			requestAnimationFrame(() => {
				setGameData((prev) => {
					return {
						id: 'game_88ac_2026',
						result: 'play',
						remaining: 3,
						moves: [
							...prev.moves,
							[
								{
									letter: 'S',
									status: 'correct',
								},
								{
									letter: 'M',
									status: 'present',
								},
								{
									letter: 'A',
									status: 'absent',
								},
								{
									letter: 'R',
									status: 'correct',
								},
								{
									letter: 'T',
									status: 'absent',
								},
							],
						],
					};
				});
			});
		});
	};

	const simulateSecondGuess = (word: string) => {
		const letters = word.split('');

		letters.forEach((letter, index) => {
			setTimeout(() => {
				setRemainTurns((prev) => {
					if (!prev) return prev;

					const activeRowIndex = 0; // Or find your index

					// Create a copy of the specific row
					const newRow = [...prev[activeRowIndex]] as Attempt;

					// Update the specific letter
					newRow[index] = { letter: letter.toUpperCase(), status: 'pending' };

					// Return the full array with the new row swapped in
					return prev.map((row, i) => (i === activeRowIndex ? newRow : row));
				});
			}, index * 150);
		});
	};

	const simulateSecondWordCheckResponse = () => {
		setRemainTurns((prev) => {
			if (!prev) return prev;

			console.log(prev);

			return prev.with(0, [
				{
					letter: 'S',
					status: 'correct',
					willTransition: true,
				},
				{
					letter: 'T',
					status: 'correct',
					willTransition: true,
				},
				{
					letter: 'O',
					status: 'correct',
					willTransition: true,
				},
				{
					letter: 'R',
					status: 'correct',
					willTransition: true,
				},
				{
					letter: 'M',
					status: 'correct',
					willTransition: true,
				},
			]);
		});

		setShouldFlip(true);
	};

	const simulateSecondSyncWithBackend = () => {
		requestAnimationFrame(() => {
			setShouldFlip(false);

			requestAnimationFrame(() => {
				setGameData((prev) => {
					return {
						id: 'game_88ac_2026',
						result: 'play',
						remaining: 2,
						moves: [
							...prev.moves,
							[
								{
									letter: 'S',
									status: 'correct',
								},
								{
									letter: 'T',
									status: 'correct',
								},
								{
									letter: 'O',
									status: 'correct',
								},
								{
									letter: 'R',
									status: 'correct',
								},
								{
									letter: 'M',
									status: 'correct',
								},
							],
						],
					};
				});
			});
		});
	};

	return (
		<div className="main-card-container">
			{gameData.moves.map((move, movesIndex) => {
				return (
					<div className="card-container" key={movesIndex}>
						{move.map(({ letter, status }, letterIndex) => {
							return (
								<div className={`card`} key={letterIndex}>
									<div className="inner">
										<div className={`front ${getStatusClassName(status)}`}>
											{letter}
										</div>
									</div>
								</div>
							);
						})}
					</div>
				);
			})}
			{remainingTurns?.map((remainingTurn, remainingTurnIndex) => {
				return (
					<div
						className={`card-container ${shouldFlip && remainingTurnIndex == 0 ? 'card-container-flip' : ''}`}
						key={remainingTurnIndex}
					>
						{remainingTurn.map(
							({ letter, status, willTransition }, letterIndex) => {
								return (
									<div
										className={`card placement-${letterIndex}`}
										key={letterIndex}
									>
										<div
											className={`inner ${!willTransition ? 'no-transition' : ''}`}
											style={{
												...(willTransition && {
													transitionDelay: `${letterIndex * 150}ms`,
												}),
											}}
										>
											<div className={`front pending`}>{letter}</div>
											{willTransition && (
												<div className={`back ${getStatusClassName(status)}`}>
													{letter}
												</div>
											)}
										</div>
									</div>
								);
							},
						)}
					</div>
				);
			})}

			<button className="block" onClick={() => simulateNextGuess('SMART')}>
				Simulate next guess
			</button>
			<button className="block" onClick={() => simulateWordCheckResponse()}>
				Simulate check response
			</button>
			<button className="block" onClick={() => simulateSyncWithBackend()}>
				Simulate sync with backend
			</button>
			<button className="block" onClick={() => simulateSecondGuess('STORM')}>
				Simulate Second guess
			</button>
			<button
				className="block"
				onClick={() => simulateSecondWordCheckResponse()}
			>
				Simulate Second word check response
			</button>

			<button className="block" onClick={() => simulateSecondSyncWithBackend()}>
				Simulate second sync with backend
			</button>
		</div>
	);
};
export default Wordle;

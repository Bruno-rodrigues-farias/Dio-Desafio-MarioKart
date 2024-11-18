const players = [
    { Nome: 'Mario', Velocidade: 4, Manobrabilidade: 3, Poder: 3, Pontos: 0 },
    { Nome: 'Luigi', Velocidade: 3, Manobrabilidade: 4, Poder: 4, Pontos: 0 },
    { Nome: 'Peach', Velocidade: 3, Manobrabilidade: 4, Poder: 2, Pontos: 0 },
    { Nome: 'Yoshi', Velocidade: 2, Manobrabilidade: 4, Poder: 3, Pontos: 0 },
    { Nome: 'Donkey Kong', Velocidade: 2, Manobrabilidade: 2, Poder: 5, Pontos: 0 },
    { Nome: 'Bowser', Velocidade: 5, Manobrabilidade: 2, Poder: 5, Pontos: 0 }
];

async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
    const random = Math.random();
    if (random <= 0.33) return 'RETA';
    if (random <= 0.66) return 'CURVA';
    return 'CONFRONTO';
}

async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(`${characterName} 🎲 rolou no bloco ${block}: Dado = ${diceResult}, Atributo = ${attribute}`);
}

async function playRaceEngine(player1, player2) {
    for (let round = 1; round <= 5; round++) {
        console.log(`🏁 Rodada ${round}`);

        const block = await getRandomBlock();
        console.log(`Bloco sorteado: ${block}`);

        const diceResult1 = await rollDice();
        const diceResult2 = await rollDice();

        let score1 = 0, score2 = 0;

        if (block === 'RETA') {
            score1 = diceResult1 + player1.Velocidade;
            score2 = diceResult2 + player2.Velocidade;
            await logRollResult(player1.Nome, block, diceResult1, player1.Velocidade);
            await logRollResult(player2.Nome, block, diceResult2, player2.Velocidade);
        } else if (block === 'CURVA') {
            score1 = diceResult1 + player1.Manobrabilidade;
            score2 = diceResult2 + player2.Manobrabilidade;
            await logRollResult(player1.Nome, block, diceResult1, player1.Manobrabilidade);
            await logRollResult(player2.Nome, block, diceResult2, player2.Manobrabilidade);
        } else if (block === 'CONFRONTO') {
            score1 = diceResult1 + player1.Poder;
            score2 = diceResult2 + player2.Poder;
            await logRollResult(player1.Nome, block, diceResult1, player1.Poder);
            await logRollResult(player2.Nome, block, diceResult2, player2.Poder);
        }

        if (score1 > score2) {
            console.log(`⭐ ${player1.Nome} venceu a rodada!`);
            player1.Pontos += 1;
        } else if (score2 > score1) {
            console.log(`⭐ ${player2.Nome} venceu a rodada!`);
            player2.Pontos += 1;
        } else {
            console.log('⚖️ Empate nesta rodada!');
        }

        console.log(`${player1.Nome}: ${player1.Pontos} pontos, ${player2.Nome}: ${player2.Pontos} pontos\n`);
    }

    if (player1.Pontos > player2.Pontos) {
        console.log(`🎉 ${player1.Nome} é o grande vencedor da corrida!`);
    } else if (player2.Pontos > player1.Pontos) {
        console.log(`🎉 ${player2.Nome} é o grande vencedor da corrida!`);
    } else {
        console.log('🏁 A corrida terminou em empate!');
    }
}

(async function main() {
    console.log(`🏁🚨 Corrida entre ${players[0].Nome} e ${players[1].Nome} começando...\n`);
    await playRaceEngine(players[0], players[1]);
})();

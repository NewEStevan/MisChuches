document.addEventListener("DOMContentLoaded", () => {
    // Configuración inicial
    const web3 = new Web3(Web3.givenProvider || "https://bsc-dataseed.binance.org/"); // Nodo público de Binance Smart Chain
    const usdtContractAddress = "0x55d398326f99059fF775485246999027B3197955"; // Dirección del contrato de USDT en BSC
    const usdtAbi = [
        {
            constant: true,
            inputs: [{ name: "_owner", type: "address" }],
            name: "balanceOf",
            outputs: [{ name: "balance", type: "uint256" }],
            type: "function",
        },
        {
            constant: false,
            inputs: [
                { name: "_to", type: "address" },
                { name: "_value", type: "uint256" },
            ],
            name: "transfer",
            outputs: [{ name: "", type: "bool" }],
            type: "function",
        },
    ];

    const usdtContract = new web3.eth.Contract(usdtAbi, usdtContractAddress);
    const merchantWallet = "0x1301F08cB2F056cBBD5a00912f522D4C518E1c1E"; // Cambia esto por tu dirección de wallet

    // Función para conectar Metamask
    async function connectWallet() {
        if (window.ethereum) {
            try {
                // Solicita las cuentas conectadas
                const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
                console.log("Wallet conectada:", accounts[0]);
                alert("Wallet conectada: " + accounts[0]);
                return accounts[0]; // Devuelve la primera cuenta conectada
            } catch (error) {
                console.error("Error al conectar la wallet:", error);
                alert("No se pudo conectar la wallet.");
            }
        } else {
            alert("Por favor, instala Metamask para continuar.");
        }
    }

    // Función para realizar el pago
    async function sendPayment(amount) {
        const userWallet = await connectWallet();
        if (!userWallet) return;

        const amountInWei = web3.utils.toWei(amount.toString(), "mwei"); // USDT usa 6 decimales

        try {
            const tx = await usdtContract.methods
                .transfer(merchantWallet, amountInWei)
                .send({ from: userWallet });

            console.log("Transacción completada:", tx.transactionHash);
            alert("Pago realizado con éxito. ¡Gracias!");
        } catch (error) {
            console.error("Error al realizar el pago:", error);
            alert("Hubo un error al procesar el pago.");
        }
    }

    // Evento para el botón de pago
    const paymentButton = document.getElementById("proceedToPayment");
    paymentButton.addEventListener("click", () => {
        const totalAmount = 10; // Cambia esto por el total dinámico del carrito
        sendPayment(totalAmount);
    });
});
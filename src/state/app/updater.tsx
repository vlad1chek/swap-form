import { useWeb3React } from "@web3-react/core"
import { useEffect } from "react"
import { useEagerConnect, useInactiveListener } from "../../hooks"
import { useCurrentNetwork } from "../../hooks/useCurrentNetwork"

export function useConnectWallet(): null {
    const triedEager = useEagerConnect()
    const { createNetwork } = useCurrentNetwork()
    const { active, activate, error } = useWeb3React()

    // after eagerly trying injected, if the network connect ever isn't active or in an error state, activate itd
    useEffect(() => {
        if (triedEager && !active && !error) {
            // create at the moment of usage
            activate(createNetwork())
        }
    }, [triedEager, error, active, activate, createNetwork])

    useInactiveListener(!triedEager)
    return null
}
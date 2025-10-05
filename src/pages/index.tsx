import GameCreateContainer from '@/components//Game/CreateContainer';
import Card from '@/components/base/Card';
import SearchGameForm from '@/components/Game/SearchGameForm';
import Layout from '@/components/layout';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <Layout>
      <div className="flex flex-col gap-y-8 flex-1">
        <Card className="space-y-4 w-full">
          <h3 className="font-semibold text-2xl">Create New Game</h3>
          <GameCreateContainer />
        </Card>

        <Card className="space-y-4 w-full">
          <h3 className="font-semibold text-xl">
            If you already have an ongoing game
          </h3>
          <SearchGameForm />
        </Card>

        <Card className="flex flex-col gap-8 items-start">
          <h3 className="font-semibold text-xl">
            Do you want to know more about this game? 🤔
          </h3>
          <div>
            <Disclosure>
              <DisclosureButton className="text-lg font-medium hover:underline">
                What is RPSSL?
              </DisclosureButton>
              <DisclosurePanel className="text-gray-600 mt-2">
                <p>
                  <a
                    className="underline hover:text-blue-400"
                    href="https://en.wikipedia.org/wiki/Rock%E2%80%93paper%E2%80%93scissors#Additional_weapons"
                    target="_blank"
                    rel="noreferrer"
                  >
                    RPSSL
                  </a>{' '}
                  is a <b>blockchain-game</b> that extends the classic
                  Rock-Paper-Scissors by adding two more choices: Spock and
                  Lizard. Players can create or join games, make their choices,
                  and wager cryptocurrency on the outcome. The game leverages
                  smart contracts to ensure fairness and transparency, making it
                  an exciting way to engage in strategic gameplay while
                  potentially earning rewards 💰
                </p>
              </DisclosurePanel>
            </Disclosure>
          </div>

          <div>
            <Disclosure>
              <DisclosureButton className="text-lg font-medium hover:underline">
                How does it work?
              </DisclosureButton>
              <DisclosurePanel className="text-gray-600 mt-2">
                <p>
                  A player creates a RPSSL game by deploying a smart contract.
                  The smart contract manages the game state and ensures fair
                  play. We support you to create a game or search an existing
                  game on <b>our platform</b>.
                </p>
              </DisclosurePanel>
            </Disclosure>
          </div>

          <div>
            <Disclosure>
              <DisclosureButton className="text-lg font-medium hover:underline">
                What is the rule of RPSSL?
              </DisclosureButton>
              <DisclosurePanel className="text-gray-600 mt-2">
                <ul className="list-disc list-inside space-y-1">
                  <li>Rock crushes Scissors and crushes Lizard</li>
                  <li>Paper covers Rock and disproves Spock</li>
                  <li>Scissors cuts Paper and decapitates Lizard</li>
                  <li>Lizard eats Paper and poisons Spock</li>
                  <li>Spock smashes Scissors and vaporizes Rock</li>
                </ul>
                <p className="mt-2">
                  If both players choose the same move, the game ends in a tie
                  and neither player wins.
                  <br />
                  If a player does not make their move within <b>5 minutes</b>,
                  the other player can call a timeout to claim the stake or end
                  the game. This ensures the game doesn&apos;t get stalled
                  indefinitely.
                </p>
              </DisclosurePanel>
            </Disclosure>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Home;

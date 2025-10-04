import GameCreateContainer from '@/components//Game/CreateContainer';
import Button from '@/components/base/Button';
import Card from '@/components/base/Card';
import Input from '@/components/base/Input';
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
      <main className="mx-8">
        <div className="max-w-6xl mx-auto flex flex-col gap-y-8 flex-1">
          <Card className="space-y-4 w-full">
            <h3 className="font-semibold text-2xl">Create New Game</h3>
            <GameCreateContainer />
          </Card>

          <Card className="space-y-4 w-full">
            <h3 className="font-semibold text-xl">
              If you already have an ongoing game
            </h3>
            <Input type="text" placeholder="Enter Game Address to join" />
            <Button className="mt-2 w-full" variant="secondary">
              Join Game
            </Button>
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
                    Lizard. Players can create or join games, make their
                    choices, and wager cryptocurrency on the outcome. The game
                    leverages smart contracts to ensure fairness and
                    transparency, making it an exciting way to engage in
                    strategic gameplay while potentially earning rewards 💰
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
                    play.
                  </p>
                </DisclosurePanel>
              </Disclosure>
            </div>
          </Card>
        </div>
      </main>
    </Layout>
  );
};

export default Home;

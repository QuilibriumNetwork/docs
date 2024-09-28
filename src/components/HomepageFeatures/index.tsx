import React from 'react';
import {CardLayout} from '../Card';
import styles from './styles.module.css';

const features = [
  {
    href: '/docs/build/running-applications',
    icon: '🛠️',
    title: 'Build',
    description: 'How to develop applications on the Quilibrium network',
  },
  {
    href: '/docs/run-node/quick-start',
    icon: '💻',
    title: 'Run a Node',
    description: 'How to run a node on the Quilibrium network',
  },
  {
    href: '/docs/learn/communication',
    icon: '📚',
    title: 'Learn',
    description: 'How the Quilibrium network works',
  },
];

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={'row'}>
          {features.map((feature, idx) => (
            <div className="col col--4 margin-bottom--lg" key={idx}>
              <CardLayout
                href={feature.href}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

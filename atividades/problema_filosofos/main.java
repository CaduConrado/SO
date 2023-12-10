import java.util.concurrent.Semaphore;

class Filosofo implements Runnable {
    private final int id;
    private final Semaphore garfoEsquerdo;
    private final Semaphore garfoDireito;

    public Filosofo(int id, Semaphore garfoEsquerdo, Semaphore garfoDireito) {
        this.id = id;
        this.garfoEsquerdo = garfoEsquerdo;
        this.garfoDireito = garfoDireito;
    }

    private void pensando() throws InterruptedException {
        System.out.println("Filósofo " + id + " está pensando.");
        Thread.sleep(1000);
    }

    private void comendo() throws InterruptedException {
        System.out.println("Filósofo " + id + " está comendo.");
        Thread.sleep(1000);
    }

    @Override
    public void run() {
        try {
            while (true) {
                pensando();

                garfoEsquerdo.acquire();
                System.out.println("Filósofo " + id + " pegou o garfo esquerdo.");

                garfoDireito.acquire();
                System.out.println("Filósofo " + id + " pegou o garfo direito.");

                comendo();

                garfoDireito.release();
                System.out.println("Filósofo " + id + " largou o garfo direito.");

                garfoEsquerdo.release();
                System.out.println("Filósofo " + id + " largou o garfo esquerdo.");
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}

public class JantarDosFilosofos {
    public static void main(String[] args) {
        int numFilosofos = 5;
        Semaphore[] garfos = new Semaphore[numFilosofos];

        for (int i = 0; i < numFilosofos; i++) {
            garfos[i] = new Semaphore(1); 
        }

        Thread[] filosofos = new Thread[numFilosofos];

        for (int i = 0; i < numFilosofos; i++) {
            filosofos[i] = new Thread(new Filosofo(i, garfos[i], garfos[(i + 1) % numFilosofos]));
            filosofos[i].start();
        }
    }
}

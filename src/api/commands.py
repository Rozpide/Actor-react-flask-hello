import click
from api.models import db, Actor

"""
In this file, you can add as many commands as you want using the @app.cli.command decorator
Flask commands are usefull to run cronjobs or tasks outside of the API but sill in integration 
with youy database, for example: Import the price of bitcoin every night as 12am
"""
def setup_commands(app):
    
    """ 
    This is an example command "insert-test-actors" that you can run from the command line
    by typing: $ flask insert-test-actors 5
    Note: 5 is the number of actors to add
    """
    @app.cli.command("insert-test-actors") # name of our command
    @click.argument("count") # argument of our command
    def insert_test_actors(count):
        print("Creating test actors")
        for x in range(1, int(count) + 1):
            actor = Actor(name=f"Test Actor {x}", nationality="Unknown")
            db.session.add(actor)
            db.session.commit()
            print(f"Actor: {actor.name} created.")

        print("All test actors created")

    @app.cli.command("insert-test-data")
    def insert_test_data():
        pass

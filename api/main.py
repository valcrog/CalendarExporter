from fastapi import FastAPI, Response, Query
from typing import Optional
from ics_generator import generate_ics

app = FastAPI()

# List of known options. Alternatively, you can do a custom validator.
VALID_OPTIONS = ['all', 'none', 'BIOINFO', 'PP', 'II2D', 'META', 'MAL', 'PDM']

@app.get("/generate")
def generate_calendar(
    # We can have an explicit 'optionChoice' query parameter with default='none'.
    optionChoice: str = Query('none', description="One of 'all', 'none', 'BIOINFO', 'PP', 'II2D', 'META', 'MAL', 'PDM'"),
    # We can define each course as a query parameter with default=None.
    TEC: Optional[int] = None,
    Projet: Optional[int] = None,
    RSX2: Optional[int] = None,
    GL: Optional[int] = None,
    JSFS: Optional[int] = None,
    Logique: Optional[int] = None,
    LAAS: Optional[int] = None,
    ARCHI: Optional[int] = None,
    PDS: Optional[int] = None
):
    """
    Generates an ICS file based on the given query params.

    For example:
    /generate?optionChoice=none&Logique=2&JSFS=3
    """

    if optionChoice not in VALID_OPTIONS:
        optionChoice = 'none'

    # Build the courseGroup dict. If a parameter is None, that indicates no group selected.
    courseGroup = {
        'TEC': TEC,
        'Projet': Projet,
        'RSX2': RSX2,
        'GL': GL,
        'JSFS': JSFS,
        'Logique': Logique,
        'LAAS': LAAS,
        'ARCHI': ARCHI,
        'PDS': PDS
    }

    ics_content = generate_ics(optionChoice, courseGroup)

    # Return the ICS content with the correct MIME type for iCalendar.
    return Response(content=ics_content, media_type="text/calendar")

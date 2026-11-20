"""Compare exclusive lemmas in consecutive windows with the Longer Ending.

Usage: python replicate.py 62-Mk-morphgnt.txt
Download the Mark data file from the linked version 6.12 of MorphGNT.

Data: J. K. Tauber, MorphGNT SBLGNT 6.12, github.com/morphgnt/sblgnt
Tag 6.12, 62-Mk-morphgnt.txt, Git blob 6bd9ce1627e12bd45434b0d18f875c89581d855f
"""
from collections import Counter
from pathlib import Path
from statistics import median
import sys


def main():
    data = Path(sys.argv[1]) if len(sys.argv)>1 else Path("62-Mk-morphgnt.txt")
    rows = [line.split() for line in data.read_text(encoding="utf-8").splitlines()]
    assert all(len(row) == 7 for row in rows)
    # 021608 also tags the separately bracketed Intermediate Ending.
    last_fear = next(i for i, row in enumerate(rows)
                     if row[0] == "021608" and row[4] == "ἐφοβοῦντο")
    assert rows[last_fear + 1][6] == "γάρ" and rows[last_fear + 2][4] == "Πάντα"
    main_text = [row[6] for row in rows[:last_fear + 2]]
    longer = [row[6] for row in rows if row[0] >= "021609"]
    all_counts = Counter(main_text + longer)
    def exclusive(sample):
        return [lemma for lemma, n in Counter(sample).items() if n == all_counts[lemma]]

    width = len(longer)
    observed = len(exclusive(longer))
    controls = [len(exclusive(main_text[start:start + width]))
                for start in range(len(main_text) - width + 1)]
    exceedances = sum(value >= observed for value in controls)
    print("Words in Mark 1:1–16:8 and 16:9–20:", len(main_text), width)
    print("Distinct lemmas confined to 16:9–20:", observed, ", ".join(exclusive(longer)))
    print("Controls, median, minimum, maximum:", len(controls), median(controls),
          min(controls), max(controls))
    print("Controls meeting/exceeding observed count:", exceedances,
          f"({100 * exceedances / len(controls):.2f}%)")


if __name__ == "__main__":
    main()
